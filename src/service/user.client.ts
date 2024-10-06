export class UserClientService {
    private static _instance: UserClientService;

    private readonly avatarPath = "/avatars/";
    private readonly avatars: Record<string, string> = {
        black: "BLACK.png",
        blue: "BLUE.png",
        green: "GREEN.png",
        orange: "ORANGE.png",
        pink: "PINK.png",
        purple: "PURPLE.png",
        red: "RED.png",
        yellow: "YELLOW.png",
        darkGreen: "DARKGREEN.png",
        cyan: "CYAN.png",
        brown: "BROWN.png",
        white: "WHITE.png",
        gray: "GRAY.png",
    }
    private readonly avatarKeys: string[] = Object.keys(this.avatars);

    static getInstance() {
        if (!UserClientService._instance) {
            UserClientService._instance = new UserClientService();
        }
        return UserClientService._instance;
    }

    private hashString(id: string): number {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = (hash << 5) - hash + id.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    getAvatarById(id: string): string {
        const hash = this.hashString(id);
        const avatarKey = this.avatarKeys[hash % this.avatarKeys.length];
        return this.avatarPath + this.avatars[avatarKey];
    }
}