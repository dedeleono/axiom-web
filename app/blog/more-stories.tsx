import Link from "next/link";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";

import { sanityFetch } from "@/sanity/lib/fetch";
import { moreStoriesQuery } from "@/sanity/lib/queries";

interface Post {
  _id: string;
  title: string;
  slug: string;
  coverImage: any;
  excerpt: string | null;
  date: string;
  author: {
    name: string;
    picture: any;
  } | null;
}

export default async function MoreStories(params: {
  skip: string;
  limit: number;
}) {
  const data = await sanityFetch({ query: moreStoriesQuery, params }) as Post[] | null;

  return (
    <div className="mb-24 md:mb-28 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:gap-x-16">
      {data?.map((post: Post) => {
        const { _id, title, slug, coverImage, excerpt, author } = post;
        return (
          <article key={_id}>
            <Link href={`/blog/posts/${slug}`} className="group mb-5 block">
              <CoverImage image={coverImage} priority={false} />
            </Link>
            <h3 className="text-balance text-2xl font-light leading-snug tracking-tight text-brand-black md:text-3xl mb-3 font-geist">
              <Link
                href={`/blog/posts/${slug}`}
                className="transition-colors hover:text-brand-orange"
              >
                {title}
              </Link>
            </h3>
            <DateComponent
              dateString={post.date}
              className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray"
            />
            {excerpt && (
              <p className="text-pretty mb-4 text-brand-dark-gray font-light text-base leading-relaxed md:text-lg">
                {excerpt}
              </p>
            )}
            {author && <Avatar name={author.name} picture={author.picture} />}
          </article>
        );
      })}
    </div>
  );
}
