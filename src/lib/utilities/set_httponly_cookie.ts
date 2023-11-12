export default function setHttpOnlyCookie(name: string, value: string, expiresInDays: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expiresInDays);

    // Format the cookie string
    const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; HttpOnly; expires=${expirationDate.toUTCString()};`;

    // Set the cookie
    document.cookie = cookieString;
}