
const getActiveMedia = (ad) => {
    if (ad?.selectedMedia?.length) {
        const activeMedia = ad.selectedMedia[0].media?.filter(media => media.status === "Active") || [];

        // Sort by sequenceNumber before mapping
        return activeMedia
            .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
            .map(item => ({
                type: item.mediaType,
                src: item.filePath,
                company_name: item.company_name,
                name: item.name,
                url: item.url,
                sequenceNumber: item.sequenceNumber,
                position: ad.selectedMedia[0].position
            }));
    }
    return [];
};
export default getActiveMedia;
