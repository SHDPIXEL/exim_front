const dataFormatter = (date_) => {



    const formattedDate = (() => {
        const date = new Date(date_);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    })()
    return formattedDate;
}
export default dataFormatter;