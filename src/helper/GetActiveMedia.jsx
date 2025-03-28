const getActiveMedia = (ad) => {
    if (ad?.selectedMedia?.length) {
        const activeMedia = ad.selectedMedia[0].media?.filter(media => media.status === "Active") || [];

        // Sort by sequenceNumber before mapping
        return activeMedia
            .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            .map(item => ({
                type: item.mediaType,
                src: item.filePath,
                url: item.url
            }));
    }
    return [];
};
export default getActiveMedia;
