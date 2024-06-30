"use server"
import { connectToDatabase } from "@/utils/server-helpers"
import prisma from "../../../../prisma";

interface AddPokemonProps {
    username: string,
    pokemonName: string,
    pokemonLevel: number,
}

interface AddImageProps {
    username: string,
    image: string,
}

export const addPokemon = async (props: AddPokemonProps) => {
    try {
        await connectToDatabase()
        console.log("successfully connected");

        const user = await prisma.user.findUnique({
            where: {name: props.username}
        })

        if (!user) {
            console.log("Error with user");
            return null
        }

        const newPokemon = await prisma.pokemon.create({
            data: {name: props.pokemonName, level: props.pokemonLevel, userId: user.id}
        })

        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: { pokemonIds: {
                    push: newPokemon.id
                },
                pokemons: {
                connect: {id: newPokemon.id}
            }
        },
        include: {pokemons: true}
        })
        
        console.log(`User with name: ${user} fetched successfully.`);
        return updatedUser;
    } catch (error) {
        console.error("Error in getProfile function:", error);
        throw new Error("Server error: Unable to fetch user profile");
    } finally{
        console.log("Disconnecting from the database...");
        await prisma.$disconnect();
        console.log("Disconnected from the database.");
    }
}


export const addImage = async (props: AddImageProps) => {
    try {
        
        await connectToDatabase()

        const user = await prisma.user.findUnique({
            where: {name: props.username}
        })

        if(!user) return null

        const updatedUser = await prisma.user.update({
            where: { id: user.id},
            data: { profileImg: props.image}
        })

        return updatedUser
    } catch (error) {
        console.error("Error in getProfile function:", error);
        throw new Error("Server error: Unable to fetch user profile");
    } finally {
        await prisma.$disconnect()
    }
}