const getActiveMedia = (ad) => {
    if (ad?.selectedMedia?.length) {
        const activeMedia = ad.selectedMedia[0].media?.filter(media => media.status === "Active") || [];

        // Sort by sequenceNumber before mapping
        return activeMedia
            .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            .map(item => ({
                type: item.mediaType,
                src: item.filePath
            }));
    }
    return [];
};
export default getActiveMedia;
