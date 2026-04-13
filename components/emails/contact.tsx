import React from "react";
import { projectTypeIdsToLabels } from "@/lib/consultation-project-options";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ContactEmailProps {
  intent?: "consultation" | "general";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consultation?: {
    projectTypes: string[];
    hasArchitecturalPlans: "yes" | "no";
    startTimeline: string;
    planAttachments?: { url: string; filename: string }[];
  };
  recipient?: "admin" | "user";
}

function intentLabel(intent: ContactEmailProps["intent"]): string {
  if (intent === "consultation") return "Consultation request";
  return "General inquiry";
}

function timelineLabel(t: string): string {
  const map: Record<string, string> = {
    asap: "As soon as possible",
    within_year: "Within the next year",
    over_year: "Over a year from now",
    undecided: "Needs help deciding",
  };
  return map[t] ?? t;
}

export default function ContactEmail(props: ContactEmailProps) {
  const previewText =
    props.recipient === "user"
      ? "Thank you for contacting Axiom Renovation"
      : `New message from ${props.name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                alt="Axiom Renovation"
                src="https://axiomrenovation.com/logo.png"
                width="80"
                height="80"
                style={{
                  margin: "0 auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {props.recipient === "admin" && `New message from ${props.name}`}
            </Heading>
            {props.recipient === "admin" && props.intent && (
              <Text className="text-black text-[14px] leading-[24px] font-semibold">
                Type: {intentLabel(props.intent)}
              </Text>
            )}
            {props.recipient === "admin" &&
              props.intent === "consultation" &&
              props.consultation && (
                <>
                  <Text className="text-black text-[14px] leading-[22px]">
                    <span className="font-semibold">Project interests:</span>{" "}
                    {projectTypeIdsToLabels(props.consultation.projectTypes)}
                  </Text>
                  <Text className="text-black text-[14px] leading-[22px]">
                    <span className="font-semibold">Architectural plans:</span>{" "}
                    {props.consultation.hasArchitecturalPlans === "yes"
                      ? "Yes"
                      : "No"}
                  </Text>
                  {props.consultation.hasArchitecturalPlans === "yes" &&
                    props.consultation.planAttachments &&
                    props.consultation.planAttachments.length > 0 && (
                      <Text className="text-black text-[14px] leading-[22px]">
                        <span className="font-semibold block mb-1">
                          Uploaded drawings:
                        </span>
                        {props.consultation.planAttachments.map((a) => (
                          <span key={a.url} className="block">
                            <a
                              href={a.url}
                              className="text-sky-600 underline underline-offset-2"
                            >
                              {a.filename}
                            </a>
                          </span>
                        ))}
                      </Text>
                    )}
                  <Text className="text-black text-[14px] leading-[22px]">
                    <span className="font-semibold">Start timeline:</span>{" "}
                    {timelineLabel(props.consultation.startTimeline)}
                  </Text>
                </>
              )}
            <Text className="text-black text-[14px] leading-[24px]">
              {props.recipient === "user" && <>Dear {props.name},</>}
              {props.recipient === "admin" && (
                <>
                  Contact details: {props.email}
                  {props.phone && ` | ${props.phone}`}
                </>
              )}
            </Text>
            {props.recipient === "user" && (
              <Text className="text-black text-[14px] leading-[24px]">
                {props.intent === "consultation"
                  ? "Your consultation has been scheduled. We look forward to meeting with you."
                  : "We have received your message and our team will get back to you as soon as we can."}
              </Text>
            )}
            {props.message && (
              <Text className="text-black text-[14px] leading-[24px]">
                {props.recipient === "admin" && props.message}
                {props.recipient === "user" && (
                  <>
                    <span className="font-normal">Your message:</span>
                    <br />
                    <span className="italic font-black">
                      &quot;{props.message}&quot;
                    </span>
                  </>
                )}
              </Text>
            )}

            {props.recipient === "admin" && (
              <>
                <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                <Text className="text-[#666666] text-[12px] leading-[24px]">
                  We have sent a confirmation email to{" "}
                  <span className="text-black">{props.email}</span> also.
                </Text>
              </>
            )}
            {props.recipient === "user" && (
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                If you have any immediate questions, you can reach us at{" "}
                <span className="text-sky-500 underline-offset-1 underline">
                  info@axiomrenovation.com
                </span>
              </Text>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
