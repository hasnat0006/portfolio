"use client";

import { SectionDivider } from "@/components/shared/SectionDivider";
import { EXP_STYLES } from "@/constants/experience";
import {
  education,
  volunteerExperience,
  workExperience,
} from "@/data/timeline";
import { EducationCard } from "./components/EducationCard";
import { ExperienceHeader } from "./components/ExperienceHeader";
import { TimelineGroup } from "./components/TimelineGroup";
import { VolunteerCard } from "./components/VolunteerCard";
import { WorkCard } from "./components/WorkCard";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
      aria-label="Experience"
    >
      <style>{EXP_STYLES}</style>

      <div className="max-w-6xl mx-auto">
        <ExperienceHeader />

        <SectionDivider label="Education" />
        <TimelineGroup>
          {education.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </TimelineGroup>

        <SectionDivider label="Work Experience" />
        <TimelineGroup>
          {workExperience.map((item, index) => (
            <WorkCard key={index} item={item} index={index} />
          ))}
        </TimelineGroup>

        <SectionDivider label="Volunteer" />
        <TimelineGroup>
          {volunteerExperience.map((item, index) => (
            <VolunteerCard key={index} item={item} index={index} />
          ))}
        </TimelineGroup>
      </div>
    </section>
  );
}
