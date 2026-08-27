import { definePlugin, type DocumentDefinition } from "sanity";
import { type StructureResolver } from "sanity/structure";
import { CaseIcon } from "@sanity/icons/Case";
import { ComposeIcon } from "@sanity/icons/Compose";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { PinIcon } from "@sanity/icons/Pin";

export const singletonPlugin = definePlugin((types: string[]) => {
  return {
    name: "singletonPlugin",
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId),
          );
        }

        return prev;
      },
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  };
});

function requireSingleton(
  defs: DocumentDefinition[],
  name: string,
): DocumentDefinition {
  const d = defs.find((x) => x.name === name);
  if (!d) {
    throw new Error(`pageStructure: missing schema definition "${name}"`);
  }
  return d;
}

function singletonEditorItem(
  S: Parameters<StructureResolver>[0],
  typeDef: DocumentDefinition,
) {
  return S.listItem()
    .title(typeDef.title ?? typeDef.name)
    .icon(typeDef.icon)
    .child(
      S.editor()
        .id(typeDef.name)
        .schemaType(typeDef.name)
        .documentId(typeDef.name),
    );
}

/**
 * Desk sidebar: grouped by site area. Legacy types stay reachable but out of the main tree.
 */
export const pageStructure = (
  singletonDefs: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    const blogSettings = requireSingleton(singletonDefs, "blogSettings");
    const faqPage = requireSingleton(singletonDefs, "faqPage");
    const philosophySection = requireSingleton(singletonDefs, "philosophySection");

    return S.list()
      .title("Content")
      .items([
        S.listItem()
          .title("Homepage")
          .icon(HomeIcon)
          .child(
            S.list()
              .title("Homepage")
              .items([
                singletonEditorItem(S, philosophySection),
                S.documentTypeListItem("service").title("Service cards (3 tiles)"),
                S.documentTypeListItem("whoWeAre").title("Who we are"),
                S.documentTypeListItem("whyChooseUs").title("Why choose us"),
                S.documentTypeListItem("award").title("Awards"),
                S.documentTypeListItem("project").title("Portfolio projects"),
                S.documentTypeListItem("home").title("Page heroes & overlays"),
              ]),
          ),

        S.listItem()
          .title("Services")
          .icon(CaseIcon)
          .child(
            S.list()
              .title("Services")
              .items([
                S.documentTypeListItem("innovation").title(
                  "Service detail pages (/services/…)",
                ),
              ]),
          ),

        S.listItem()
          .title("Areas")
          .icon(PinIcon)
          .child(
            S.documentTypeList("location")
              .title("Location pages (/areas/…)")
              .filter('_type == "location"'),
          ),

        S.listItem()
          .title("Blog")
          .icon(ComposeIcon)
          .child(
            S.list()
              .title("Blog")
              .items([
                singletonEditorItem(S, blogSettings),
                S.documentTypeListItem("post").title("Posts"),
                S.documentTypeListItem("author").title("Authors"),
              ]),
          ),

        S.divider(),

        S.listItem()
          .title("FAQ page")
          .icon(HelpCircleIcon)
          .child(
            S.editor()
              .id(faqPage.name)
              .schemaType(faqPage.name)
              .documentId(faqPage.name),
          ),
      ]);
  };
};
