import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NetworkConfig } from "./network.service";
import ArticleType from "../utils/ArticleType";
import { catchError, connect, filter, map, switchAll, throwError } from "rxjs";
import Article from "../models/Articles";

@Injectable({
    providedIn: "root"
})
export class PokeApiService {
    constructor (private http: HttpClient, private config: NetworkConfig) {}


    private getArticleType(type: ArticleType) {
        switch (type) {
            case ArticleType.articles:
                return ArticleType.archived
            case ArticleType.archived:
                return ArticleType.archived
            case ArticleType.favourites:
                return ArticleType.archived
            default:
                return ArticleType.archived;
        }
    }

    addArticles(input: {url: string, title?: string}) {
        console.log("entered")
        return this.http.post<{[key: string]: any}>(
            `${this.config.url}/articles/add`,
            {
                ...input,
                ...this.config.body
            },
            this.config.options
        ).pipe(
            map((data): Article => {
                console.log("results")
                if(!Number(data["status"])) {
                    console.log("error")
                }
                let article =  data["item"]
                console.log(article)
                return  {
                    id: article["resolved_id"],
                    title: article["resolved_title"] ? article["resolved_title"] : article["title"],
                    url: article["resolved_url"] ? article["resolved_url"] : article["given_url"],
                    domainName: article["domain_metadata"] == undefined ? undefined : article["domain_metadata"]["name"],
                    imageUrl: article["has_image"] == 1 ? article["top_image_url"] : null,
                    isArticle: article["is_article"],
                    timeToRead: article["time_to_read"],
                    favourite: article["favorite"],
                    status: article["status"]
                }
                
            }),
            catchError((err) => {
                return throwError(() => err)
            })
        )
    }

    getArticles() {
        console.log("default config ")
        console.log(this.config.body)
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles`, 
            {
                // count: "10",
                // offset: total + 1,
                "sort": "newest",
                detailType: "simple",
                ... this.config.body
            }, 
            this.config.options
        ).pipe(
            map((data): Article[] => {
                console.log(data)
                let list = data["list"]
                console.log(!list)
                if(!list || Object.keys(list).length == 0){
                    console.log("no value")
                    return [] as Article[]
                }
                return this.transformData(list)  
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    getFavouriteArticles() {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/favourites`, 
            {
                // count: "10",
                // offset: total + 1,
                favorite: 1,
                detailType: "simple",
                ... this.config.body
            }, 
            this.config.options
        ).pipe(
            map((data): Article[] => {
                console.log("favourites data");
                console.log(data)
                let list = data["list"]
                console.log(!list)
                if(!list || Object.keys(list).length == 0){
                    console.log("no value")
                    return [] as Article[]
                }
                return this.transformData(list)  
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    getArchivedArticles() {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/archived`, 
            {
                // count: "10",
                // offset: total + 1,
                state: "archive",
                detailType: "simple",
                ... this.config.body
            }, 
            this.config.options
        ).pipe(
            map((data): Article[]   => {
                console.log(data)
                let list = data["list"]
                if(!list || Object.keys(list).length == 0){
                    return [] as Article[]
                }
                return this.transformData(list)  
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    getArticlesOnly() {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles`, 
            {
                // count: "10",
                // offset: total + 1,
                "contentType": "article",
                "detailType": "simple",
                ... this.config.body
            }, 
            this.config.options
        ).pipe(
            map((data): Article[] => {
                console.log(data)
                let list = data["list"]
                console.log(!list)
                if(!list || Object.keys(list).length == 0){
                    console.log("no value")
                    return [] as Article[]
                }
                return this.transformData(list)  
            })
        )
    }

    archiveArticle(id: number | string) {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/action_archive`,
            {
                actions: [{
                    "action" : "archive",
                    "item_id" : id,
                }],
                ... this.config.body
            },
            this.config.options
        ).pipe(
            map(data => {
                return data;
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    unarchiveArticle(id: number | string) {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/action_archive`,
            {
                actions: [{
                    "action" : "readd",
                    "item_id" : id,
                }],
                ... this.config.body
            },
            this.config.options
        ).pipe(
            map(data => {
                return data;
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    favouriteArticle(id: number | string) {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/action_favourite`,
            {
                actions: [{
                    "action" : "favorite",
                    "item_id" : id,
                }],
                ... this.config.body
            },
            this.config.options
        ).pipe(
            map(data => {
                return data;
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    unfavouriteArticle(id: number | string) {
        return this.http.post<{[key: string] : any}>(
            `${this.config.url}/articles/action_favourite`,
            {
                actions: [{
                    "action" : "unfavorite",
                    "item_id" : id,
                }],
                ... this.config.body
            },
            this.config.options
        ).pipe(
            map(data => {
                return data;
            }),
            catchError(err => {
                return throwError(() => err)
            })
        )
    }

    deleteArticle(id: number | string) {
        return this.http.post<{[key:string] : any}>(
            `${this.config.url}/articles/action_delete`,
            {
                actions: [{
                    "action" : "delete",
                    "item_id" : id,
                }],
                ... this.config.body
            },
            this.config.options
        ).pipe(
            map(data => {
                return data;
            }),
            catchError(err => {
                return throwError(() => err)
            })
            
        )
    }

    private transformData(list: {[key: string | number] : any}) : Article[] {
        let articles: Article[] = []
        Object.keys(list).forEach(key => {
            let save = list[key]
            let article: Article = {
                id: key,
                title: save["resolved_title"] ? save["resolved_title"] : save["given_title"],
                url: save["resolved_url"] ? save["resolved_url"] : save["given_url"],
                domainName: save["domain_metadata"] == undefined ? undefined : save["domain_metadata"]["name"],
                imageUrl: save["has_image"] == 1 ? save["top_image_url"] : null,
                isArticle: save["is_article"],
                timeToRead: save["time_to_read"],
                favourite: save["favorite"],
                status: save["status"]
            }
            articles.push(article)
        })
        return articles
    }
}


