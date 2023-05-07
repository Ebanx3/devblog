import { response } from "@/types";

const login = async (username: string, password: string): Promise<response> => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "Application/json" }
    })
    const response = await res.json();
    return response;
};

const logout = async (): Promise<response> => {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "Application/json" }
    })
    const response = await res.json();
    return response;
}

const signup = async (username: string, password: string, email: string): Promise<response> => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username, password, email })
    })
    const response = await res.json();
    return response;
}

const createPost = async (title: string, content: string): Promise<response> => {
    const res = await fetch("/api/topic", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ title, content })
    })
    const response = await res.json();
    return response;
}

const addReplyToTopic = async (topicId: string, content: string) => {
    const res = await fetch("/api/topic", {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ topicId, content })
    })
    const response = await res.json();
    return response;
}

const updateTopic = async (topicId: string, content: string) => {
    const res = await fetch(`/api/topic/update/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ content })
    })
    const response = await res.json();
    return response;
}

const addOrRemoveLike = async (topicId: string) => {
    const res = await fetch(`/api/topic/like/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" }
    })
    const response = await res.json();
    return response;
}

const addOrRemoveDislike = async (topicId: string) => {
    const res = await fetch(`/api/topic/dislike/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" }
    })
    const response = await res.json();
    return response;
}

const addOrRemoveFromFavs = async (author: string, title: string, date: string, topicId: string) => {
    const res = await fetch(`/api/topic/fav`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ author, title, date, topicId })
    });
    const response = await res.json();
    return response
}

const getMyPosts = async () => {
    const res = await fetch(`/api/topic/myTopics`);
    const response = await res.json();
    return response;
}

const searchInTopics = async (query: string) => {
    const res = await fetch(`/api/topic/${query}`);
    const response = await res.json();
    return response;
}

export { login, logout, signup, createPost, addReplyToTopic, updateTopic, addOrRemoveLike, addOrRemoveDislike, addOrRemoveFromFavs, getMyPosts, searchInTopics }