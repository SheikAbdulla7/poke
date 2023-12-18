export default interface Article {
    id: number | string,
    title: string,
    url: string,
    domainName: string | null | undefined,
    imageUrl: string | null,
    isArticle: string,
    timeToRead: number | null | undefined
    favourite: string,
    status: string
}