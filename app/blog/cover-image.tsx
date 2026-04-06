import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="h-auto w-full rounded-none border border-brand-light-gray bg-brand-light-gray/20 transition-colors duration-300 group-hover:border-brand-orange/35"
      width={2000}
      height={1000}
      alt={source?.alt || "Blog post cover image"}
      src={urlForImage(source)?.height(1000).width(2000).url() as string}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div
      className="rounded-none border border-brand-light-gray bg-brand-light-gray/30"
      style={{ paddingTop: "50%" }}
    />
  );

  return <div className="sm:mx-0 overflow-hidden">{image}</div>;
}
