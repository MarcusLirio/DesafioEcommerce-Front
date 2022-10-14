export class ApiModel {
    public static get baseServidor(): string { return "https://localhost:44387/api/Pedidos"}

    public static get jwt(): string {return "Authorization:"+"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IndhLWVjb21tZXJjZS1zeXN0ZW0iLCJuYmYiOjE2NjU0NTA5NDIsImV4cCI6MTk4MTA3MDEzNywiaWF0IjoxNjY1NDUwOTQyfQ.OjzEOBfMCYw8bRC9wLbeSTwNroykPNesOH1edSCdp-c"}
    
    public static get baseUrl(): string {return this.baseServidor + this.jwt}
}