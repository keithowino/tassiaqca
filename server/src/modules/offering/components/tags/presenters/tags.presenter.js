class TagsPresenter {
	present(tags = []) {
		return tags.map((tag) => tag.tag);
	}

	presentCollection(tags = []) {
		return this.present(tags);
	}
}

export const tagsPresenter = new TagsPresenter();

export default tagsPresenter;
