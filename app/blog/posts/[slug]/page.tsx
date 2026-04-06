import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "../../avatar";
import CoverImage from "../../cover-image";
import DateComponent from "../../date";
import MoreStories from "../../more-stories";
import PortableText from "../../portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postQuery,
  blogSettingsQuery,
  postSlugsQuery,
} from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { client } from "@/sanity/lib/client";

const pageContainer =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 font-geist text-brand-black";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await client.fetch(postSlugsQuery);
  return posts || [];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: blogSettingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  const blogTitle = settings?.title || demo.title;

  return (
    <div className={pageContainer}>
      <nav className="mb-8 md:mb-10" aria-label="Blog">
        <Link
          href="/blog"
          className="inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange transition-colors hover:text-brand-black"
        >
          ← {blogTitle}
        </Link>
      </nav>

      <article>
        <h1 className="text-balance text-4xl font-light leading-[1.05] tracking-tight text-brand-black md:text-5xl lg:text-6xl max-w-4xl mb-8">
          {post.title}
        </h1>

        <div className="mb-10 flex flex-col gap-4 border-b border-brand-light-gray pb-10 md:mb-12 md:flex-row md:flex-wrap md:items-center md:gap-8">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
          <DateComponent
            dateString={post.date}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray"
          />
        </div>

        <div className="mb-12 md:mb-16">
          <CoverImage image={post.coverImage} priority />
        </div>

        {post.content?.length ? (
          <PortableText
            className="blog-post-body mx-auto max-w-2xl"
            value={post.content as PortableTextBlock[]}
          />
        ) : null}
      </article>

      <aside className="mt-16 border-t border-brand-light-gray pt-14 md:mt-20 md:pt-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
          Archive
        </p>
        <h2 className="mb-10 text-3xl font-light tracking-tight text-brand-black md:mb-12 md:text-4xl">
          Recent stories
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
