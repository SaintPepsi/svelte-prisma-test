import { PrismaClient } from '@prisma/client';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany()
	};
};

export const actions: Actions = {
	createArticle: async ({ request }) => {
		const formData = await request.formData();

		const { title, content } = Object.fromEntries(formData) as {
			title: string;
			content: string;
		};

		try {
			await prisma.article.create({
				data: {
					title,
					content
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the article' });
		}

		return {
			status: 201
		};
	},

	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid Request' });
		}

		try {
			await prisma.article.delete({
				where: {
					id: parseInt(id)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not delete the article' });
		}

		return {
			status: 200
		};
	}
};
