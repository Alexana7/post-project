class Api {
    #baseUrl;
    #headers;

    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()])
    }

    getPostsList() {
        return fetch(`${this.#baseUrl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo () {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    changeLikePostStatus(postID, like) {
        return fetch(`${this.#baseUrl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }

    deletePost(postID) {
        return fetch(`${this.#baseUrl}/posts/${postID}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getPostById(idPost) {
        return fetch(`${this.#baseUrl}/posts/${idPost}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(idPost) {
        return Promise.all([this.getPostById(idPost), this.getUserInfo()])
    }

    getPaginate(page) {
        return fetch(`${this.#baseUrl}/posts/paginate?page=${page}&limit=12`, {
          headers: this.#headers,
        }).then(this.#onResponse);
      }

    getPaginateInfo(page) {
        return Promise.all([this.getPaginate(page), this.getUserInfo()]);
      }

    addNewPost(data) {
    return fetch(`${this.#baseUrl}/posts`, {
        method: 'POST',
        headers: this.#headers,
        body: JSON.stringify(data)
    }).then(this.#onResponse)
    }

    editPost(_id, data) {
        return fetch(`${this.#baseUrl}/posts/${_id}`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data)
        }).then(this.#onResponse)
        }

}


const api = new Api ({
    baseUrl: 'https://api.react-learning.ru/v2/group-11',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjMzI4YWVhNjJiZjA0MGJlMzA3MjAiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNzEzMTI0MTMyLCJleHAiOjE3NDQ2NjAxMzJ9.c4D4wMuukXcQ3PHWnc4x5n_tIQ4pIEO6Eez2YUKJqTM'
    }
}
)

// api.getPostsList()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// api.getUserInfo()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

export default api;