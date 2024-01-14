import { PrismaClient } from '@prisma/client';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
	const getArticle = async () => {
		const article = await prisma.article.findUnique({
			where: {
				id: parseInt(params.articleID)
			}
		});

		if (!article) {
			throw error(404, 'Article not found');
		}

		return article;
	};

	return {
		article: await getArticle()
	};
};

export const actions: Actions = {
	updateArticle: async ({ request, params }) => {
		const formData = await request.formData();

		if (!params.articleID) {
			return error(400, { message: 'Invalid Request' });
		}

		const { title, content } = Object.fromEntries(formData) as {
			title: string;
			content: string;
		};

		try {
			await prisma.article.update({
				where: {
					id: parseInt(params.articleID)
				},
				data: {
					title,
					content
				}
			});
		} catch (err) {
			console.error(err);
			return error(500, { message: 'Could not update the article' });
		}

		return {
			status: 200
		};
	}
};
