export async function fetchData(url,method,body,setIsLoading){
    setIsLoading(true)
    try {
        const request = await fetch(url,{
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json();
        return response;
    } catch (error) {
        setIsLoading(false);
        console.log(error);
    }finally{
        setIsLoading(false);
    }
}