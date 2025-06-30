export function formatDate(iso: string, showTime: boolean = false): string {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let result = `${day}/${month}/${year}`;

    if (showTime) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        result += ` às ${hours}:${minutes}`;
    }

    return result;
}
