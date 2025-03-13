const dataFormatter = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    return formattedDate;
}
export default dataFormatter;