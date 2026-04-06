import Link from "next/link";
import { Suspense } from "react";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import MoreStories from "./more-stories";
import Onboarding from "./onboarding";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, blogSettingsQuery } from "@/sanity/lib/queries";

const pageContainer =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

interface HeroPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: any;
  date: string;
  author: {
    name: string;
    picture: any;
  } | null;
  content?: any[];
}

function Intro(props: { title: string | null | undefined; description: any }) {
  const title = props.title || demo.title;
  const description = props.description?.length
    ? props.description
    : demo.description;
  return (
    <header className="pb-10 md:pb-14 border-b border-brand-light-gray">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-5">
        Blog
      </p>
      <h1 className="text-balance text-4xl font-light leading-[1.05] tracking-tight text-brand-black md:text-5xl lg:text-6xl max-w-4xl mb-6 font-geist">
        {title || demo.title}
      </h1>
      <div className="max-w-2xl text-brand-dark-gray font-light text-base md:text-lg leading-relaxed">
        <PortableText
          className="prose prose-sm md:prose-base max-w-none prose-p:my-2 prose-p:font-light prose-p:text-brand-dark-gray prose-p:leading-relaxed first:prose-p:mt-0 last:prose-p:mb-0"
          value={description?.length ? description : demo.description}
        />
      </div>
    </header>
  );
}

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Pick<HeroPost, "title" | "coverImage" | "date" | "excerpt" | "author" | "slug">) {
  return (
    <article className="pt-10 md:pt-14">
      <Link className="group mb-8 block md:mb-10" href={`/blog/posts/${slug}`}>
        <CoverImage image={coverImage} priority />
      </Link>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-14 lg:gap-x-20 md:items-start pb-16 md:pb-20 border-b border-brand-light-gray">
        <div>
          <h2 className="text-pretty text-3xl font-light leading-tight tracking-tight text-brand-black md:text-4xl lg:text-[2.5rem] mb-4 font-geist">
            <Link
              href={`/blog/posts/${slug}`}
              className="transition-colors hover:text-brand-orange"
            >
              {title}
            </Link>
          </h2>
          <DateComponent
            dateString={date}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray"
          />
        </div>
        <div>
          {excerpt && (
            <p className="text-pretty mb-6 text-brand-dark-gray font-light text-lg leading-relaxed">
              {excerpt}
            </p>
          )}
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({
      query: blogSettingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <div className={`${pageContainer} font-geist bg-white text-brand-black`}>
      <Intro title={settings?.title} description={settings?.description} />
      {heroPost ? (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
        />
      ) : (
        <Onboarding />
      )}
      {heroPost?._id && (
        <aside className="pt-4 md:pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-4">
            Archive
          </p>
          <h2 className="text-3xl font-light tracking-tight text-brand-black md:text-4xl mb-10 md:mb-12 font-geist">
            More stories
          </h2>
          <Suspense>
            <MoreStories skip={heroPost._id} limit={100} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
