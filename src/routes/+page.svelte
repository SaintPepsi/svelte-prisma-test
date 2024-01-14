<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ articles } = data);
</script>

<div class="grid">
	<div>
		<h2>Articles:</h2>

		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>{article.content}</p>
				<form action="?/deleteArticle&id={article.id}" method="POST">
					<button type="submit">Delete Article</button>
				</form>
				<a href="/{article.id}" role="button">Edit Article</a>
			</article>
		{/each}
	</div>

	<form action="?/createArticle" method="POST">
		<h3>New Article</h3>
		<label for="title">Title</label>

		<input type="text" name="title" id="title" placeholder="Title" required />
		<label for="title">content</label>
		<textarea name="content" id="content" cols="30" rows="10" placeholder="Content" required />

		<button type="submit">Create Article</button>
	</form>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
