import { createListRouteHandlers } from "@/lib/api/orderedListHandlers";
import { whyChooseUsQueries } from "@/lib/db/queries/whyChooseUs";
import { validateWhyChooseUsItem } from "@/lib/validation/whyChooseUs";

function prepareData(body) {
  return {
    icon: body.icon.trim(),
    title: body.title.trim(),
    description: body.description.trim(),
    stat: body.stat.trim(),
    statLabel: body.statLabel.trim(),
  };
}

export const { GET, POST } = createListRouteHandlers(whyChooseUsQueries, {
  validate: validateWhyChooseUsItem,
  prepareCreateData: prepareData,
  revalidatePaths: ["/"],
});