export const imgRepository = {

    uploadImg: async (img) => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'content-type': 'tantantan'
            },
            body: file
        })
        if (!response.ok) throw alert('error en el fetch')
        const data = await response.json();
        return data
    },

}