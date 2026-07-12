import { PROJECTS, slugify } from "@/data/projects";
import type {
  ActivityFilter,
  ActivityItem,
  ActivityType,
  GitHubEvent,
} from "@/types/github";

// ── Known project repo lookup ───────────────────────────────────────────────

/**
 * Maps repo short names -> project slug for highlighting repos that exist
 * in the Projects section.
 *
 * Examples:
 *   "Career-Climb"    -> "career-climb"
 *   "mcc_website"     -> "mcc-website"
 *   "Autism-Compass"  -> "autism-compass"
 */
const PROJECT_REPO_NAMES: Set<string> = new Set(
  PROJECTS.map((p) => slugify(p.title)),
);

function isProjectRepo(repoName: string): boolean {
  const shortName = repoName.split("/").pop() ?? "";
  return PROJECT_REPO_NAMES.has(slugify(shortName));
}

// ── Event type normalisation ────────────────────────────────────────────────

function normalizeType(rawType: string): ActivityType {
  switch (rawType) {
    case "PushEvent":
      return "push";
    case "PullRequestEvent":
      return "pr";
    case "PullRequestReviewEvent":
      return "pr_review";
    case "IssuesEvent":
      return "issue";
    case "IssueCommentEvent":
      return "issue_comment";
    case "CreateEvent":
      return "create";
    case "DeleteEvent":
      return "delete";
    case "ReleaseEvent":
      return "release";
    case "ForkEvent":
      return "fork";
    case "WatchEvent":
      return "star";
    case "PublicEvent":
      return "public";
    case "CommitCommentEvent":
      return "commit_comment";
    case "GollumEvent":
      return "wiki";
    default:
      return "unknown";
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getPrAction(
  action: string,
): "opened" | "closed" | "merged" | "reopened" | "unknown" {
  switch (action) {
    case "opened":
      return "opened";
    case "closed": {
      // Check if merged via the pull_request.merged field — we can't access
      // it here easily, so we rely on the `merged` field from the payload.
      return "closed";
    }
    case "reopened":
      return "reopened";
    default:
      return "unknown";
  }
}

function extractPrNumber(payload: Record<string, unknown>): number | null {
  const pr = payload.pull_request as { number?: number } | undefined;
  return pr?.number ?? null;
}

function extractIssueNumber(payload: Record<string, unknown>): number | null {
  const issue = payload.issue as { number?: number } | undefined;
  return issue?.number ?? null;
}

function extractCommentNumber(payload: Record<string, unknown>): number | null {
  const comment = payload.comment as { id?: number } | undefined;
  return comment?.id ?? null;
}

// ── Main parser ─────────────────────────────────────────────────────────────

/**
 * Parse a raw GitHub Events API response into a list of ActivityItem objects.
 */
export function parseGitHubEvents(events: GitHubEvent[]): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const ev of events) {
    try {
      const item = parseSingleEvent(ev);
      if (item) items.push(item);
    } catch {
      // Skip malformed events silently
    }
  }

  return items;
}

function parseSingleEvent(ev: GitHubEvent): ActivityItem | null {
  const type = normalizeType(ev.type);
  const payload = ev.payload;
  const repoName = ev.repo.name;
  const base: Omit<ActivityItem, "title" | "type"> = {
    id: ev.id,
    repo: repoName,
    repoUrl: `https://github.com/${repoName}`,
    url: null,
    date: ev.created_at,
    isProject: isProjectRepo(repoName),
  };

  switch (type) {
    case "push": {
      const commits = (payload.commits as Array<{ message: string; sha?: string }>) ?? [];
      const count = (payload.size as number) ?? commits.length;

      // GitHub Events API often omits commits/size for older push events.
      // When that happens, extract the branch name from payload.ref and show a generic message.
      if (count === 0) {
        const ref = (payload.ref as string) ?? "";
        const branch = ref.replace(/^refs\/(heads|tags)\//, "");
        const repoShort = repoName.split("/").pop();
        return {
          ...base,
          type,
          title: branch
            ? `Pushed to ${branch} on ${repoShort}`
            : `Pushed to ${repoShort}`,
          url: `https://github.com/${repoName}/commits`,
          commitCount: 0,
          commitMessages: [],
          hasMoreCommits: false,
        };
      }

      const msgs = commits
        .slice(0, 3)
        .map((c) => c.message.split("\n")[0].trim());
      const commitUrl =
        commits.length > 0
          ? `https://github.com/${repoName}/commit/${commits[0]?.sha ?? ""}`
          : null;
      return {
        ...base,
        type,
        title:
          count === 1
            ? `Pushed 1 commit to ${repoName.split("/").pop()}`
            : `Pushed ${count} commits to ${repoName.split("/").pop()}`,
        url: commitUrl ?? `https://github.com/${repoName}/commits`,
        commitCount: count,
        commitMessages: msgs,
        hasMoreCommits: count > 3,
      };
    }

    case "pr": {
      const action = (payload.action as string) ?? "";
      const prNumber = extractPrNumber(payload);
      const isMerged = (payload.pull_request as { merged?: boolean })
        ?.merged;
      const prUrl = (payload.pull_request as { html_url?: string })?.html_url;
      const prTitle =
        (payload.pull_request as { title?: string })?.title ?? "";
      const repoShort = repoName.split("/").pop();

      let actionText: string;
      if (isMerged) {
        actionText = `Merged PR`;
      } else if (action === "opened") {
        actionText = "Opened PR";
      } else if (action === "closed") {
        actionText = "Closed PR";
      } else if (action === "reopened") {
        actionText = "Reopened PR";
      } else {
        actionText = "Updated PR";
      }

      return {
        ...base,
        type,
        title: prNumber
          ? `${actionText} #${prNumber} in ${repoShort}`
          : `${actionText} in ${repoShort}`,
        url: prUrl ?? null,
      };
    }

    case "pr_review": {
      const reviewAction = (payload.action as string) ?? "";
      const prNum = extractPrNumber(payload);
      const reviewUrl = (payload.pull_request as { html_url?: string })
        ?.html_url;
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title: prNum
          ? `${reviewAction === "submitted" ? "Reviewed" : "Commented on"} PR #${prNum} in ${repoShort}`
          : `Reviewed a PR in ${repoShort}`,
        url: reviewUrl ? `${reviewUrl}#pullrequestreview-${ev.id}` : null,
      };
    }

    case "issue": {
      const action = (payload.action as string) ?? "";
      const issueNumber = extractIssueNumber(payload);
      const issueUrl = (payload.issue as { html_url?: string })?.html_url;
      const issueTitle =
        (payload.issue as { title?: string })?.title ?? "";
      const repoShort = repoName.split("/").pop();

      let actionText: string;
      if (action === "opened") actionText = "Opened issue";
      else if (action === "closed") actionText = "Closed issue";
      else if (action === "reopened") actionText = "Reopened issue";
      else actionText = "Updated issue";

      return {
        ...base,
        type,
        title: issueNumber
          ? `${actionText} #${issueNumber} in ${repoShort}`
          : `${actionText} in ${repoShort}`,
        url: issueUrl ?? null,
      };
    }

    case "issue_comment": {
      const issueNum = extractIssueNumber(payload);
      const commentUrl = (payload.comment as { html_url?: string })?.html_url;
      const issueUrl = (payload.issue as { html_url?: string })?.html_url;
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title: issueNum
          ? `Commented on issue #${issueNum} in ${repoShort}`
          : `Commented on an issue in ${repoShort}`,
        url: commentUrl ?? issueUrl ?? null,
      };
    }

    case "create": {
      const refType = (payload.ref_type as string) ?? "";
      const ref = (payload.ref as string) ?? "";
      const repoShort = repoName.split("/").pop();

      if (refType === "repository") {
        return {
          ...base,
          type,
          title: `Created repository ${repoShort}`,
          url: `https://github.com/${repoName}`,
        };
      }
      if (refType === "branch") {
        return {
          ...base,
          type,
          title: ref
            ? `Created branch ${ref} in ${repoShort}`
            : `Created branch in ${repoShort}`,
          url: `https://github.com/${repoName}/tree/${ref}`,
        };
      }
      if (refType === "tag") {
        return {
          ...base,
          type,
          title: ref
            ? `Created tag ${ref} in ${repoShort}`
            : `Created tag in ${repoShort}`,
          url: `https://github.com/${repoName}/releases/tag/${ref}`,
        };
      }
      return {
        ...base,
        type,
        title: `Created ${refType} in ${repoShort}`,
        url: `https://github.com/${repoName}`,
      };
    }

    case "delete": {
      const delRefType = (payload.ref_type as string) ?? "";
      const delRef = (payload.ref as string) ?? "";
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title:
          delRef && delRefType
            ? `Deleted ${delRefType} ${delRef} in ${repoShort}`
            : `Deleted ${delRefType} in ${repoShort}`,
        url: `https://github.com/${repoName}`,
      };
    }

    case "release": {
      const tag = (payload.release as { tag_name?: string })?.tag_name ?? "";
      const releaseUrl = (payload.release as { html_url?: string })?.html_url;
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title: tag
          ? `Released ${tag} in ${repoShort}`
          : `Published release in ${repoShort}`,
        url: releaseUrl ?? null,
      };
    }

    case "fork": {
      const forkRepo = (payload.forkee as { full_name?: string })
        ?.full_name;
      return {
        ...base,
        type,
        title: forkRepo
          ? `Forked ${forkRepo}`
          : `Forked ${repoName.split("/").pop()}`,
        url: `https://github.com/${forkRepo ?? repoName}`,
      };
    }

    case "star": {
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title: `Starred ${repoShort}`,
        url: `https://github.com/${repoName}`,
      };
    }

    case "public": {
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type,
        title: `Made ${repoShort} public`,
        url: `https://github.com/${repoName}`,
      };
    }

    case "commit_comment": {
      const commentRepo = repoName.split("/").pop();
      const commentUrl =
        (payload.comment as { html_url?: string })?.html_url;
      return {
        ...base,
        type: "commit_comment",
        title: `Commented on a commit in ${commentRepo}`,
        url: commentUrl ?? null,
      };
    }

    case "wiki": {
      const pages = (payload.pages as Array<{ action: string; title: string }>) ?? [];
      const repoShort = repoName.split("/").pop();
      if (pages.length > 0) {
        const actions = [...new Set(pages.map((p) => p.action))];
        return {
          ...base,
          type: "wiki",
          title: actions.includes("created")
            ? `Created wiki pages in ${repoShort}`
            : `Updated wiki in ${repoShort}`,
          url: `https://github.com/${repoName}/wiki`,
        };
      }
      return {
        ...base,
        type: "wiki",
        title: `Updated wiki in ${repoShort}`,
        url: `https://github.com/${repoName}/wiki`,
      };
    }

    default: {
      const repoShort = repoName.split("/").pop();
      return {
        ...base,
        type: "unknown",
        title: `Activity in ${repoShort}`,
        url: `https://github.com/${repoName}`,
      };
    }
  }
}

// ── Date grouping ────────────────────────────────────────────────────────────

export type DateGroupKey = "today" | "yesterday" | "this_week" | "older";

export interface DateGroup {
  key: DateGroupKey;
  label: string;
  items: ActivityItem[];
}

/**
 * Group activity items by relative date buckets.
 */
export function groupByDate(items: ActivityItem[]): DateGroup[] {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart.getTime() - 86400000);
  const weekStart = new Date(todayStart.getTime() - todayStart.getDay() * 86400000);

  const groups: Record<DateGroupKey, ActivityItem[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    older: [],
  };

  for (const item of items) {
    const itemDate = new Date(item.date);
    if (itemDate >= todayStart) {
      groups.today.push(item);
    } else if (itemDate >= yesterdayStart) {
      groups.yesterday.push(item);
    } else if (itemDate >= weekStart) {
      groups.this_week.push(item);
    } else {
      groups.older.push(item);
    }
  }

  const result: DateGroup[] = [];
  if (groups.today.length > 0) result.push({ key: "today", label: "Today", items: groups.today });
  if (groups.yesterday.length > 0) result.push({ key: "yesterday", label: "Yesterday", items: groups.yesterday });
  if (groups.this_week.length > 0) result.push({ key: "this_week", label: "This Week", items: groups.this_week });
  if (groups.older.length > 0) result.push({ key: "older", label: "Older", items: groups.older });

  return result;
}

// ── Filtering ───────────────────────────────────────────────────────────────

const FILTER_MAP: Record<ActivityFilter, ActivityType[]> = {
  all: [],
  commits: ["push"],
  prs: ["pr", "pr_review"],
  releases: ["release"],
  stars: ["star"],
  forks: ["fork"],
  issues: ["issue", "issue_comment"],
};

/**
 * Filter activity items by the selected activity type filter.
 */
export function filterByType(
  items: ActivityItem[],
  filter: ActivityFilter,
): ActivityItem[] {
  if (filter === "all") return items;
  const allowed = FILTER_MAP[filter];
  return items.filter((item) => allowed.includes(item.type));
}
