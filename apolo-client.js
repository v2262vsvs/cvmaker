
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://pereira.stepzen.net/api/cvmaker/__graphql",
    headers:{
        Authorization: `apikey pereira::stepzen.net+1000::3f93c568fbb24297a03273ad086758ce829ddc78a38042cc9ba861d9242c88a6`,
    },
    cache: new InMemoryCache(),
});

export default client;