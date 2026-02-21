import { prisma } from "@/lib/prisma";

type CreateGenreSlug = {
  name: string;
  categoryId: string;
};

export async function createGenreSlug({ name, categoryId }: CreateGenreSlug) {
  try {
    const slug = name.toLowerCase().replace(/ /g, "-");
    const genre = await prisma.genre.create({
      data: {
        name,
        slug,
        categoryId,
      },
    });
    return {
      success: true,
      message: "Genre created successfully",
      genre,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create genre",
    };
  }
}
