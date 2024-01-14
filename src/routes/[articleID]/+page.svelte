<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ article } = data);
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing {article.title}</h3>
	<label for="title">Title</label>

	<input type="text" name="title" id="title" value={article.title} placeholder="Title" required />
	<label for="title">content</label>
	<textarea
		name="content"
		id="content"
		cols="30"
		rows="10"
		placeholder="Content"
		required
		value={article.content}
	/>

	<button type="submit">Update Article</button>
</form>
