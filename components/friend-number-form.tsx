"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage, FormDescription } from "@/components/ui/form"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { NumberFormSchema } from "@/schemas"
import { Separator } from "./ui/separator"
import { toast } from "./ui/use-toast"
import { useUserContext } from "@/context/user"

export const FriendNumberForm = () => {
    const {question} = useUserContext()
    const form = useForm<z.infer<typeof NumberFormSchema>>({
        resolver: zodResolver(NumberFormSchema),
        defaultValues: {
            number: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof NumberFormSchema>) => {
        try {
            toast({
                title: `Ваш друг с номером ${data.number} подсказал вам ответ!`,
                description: `Я абсолютно уверен, что правильный ответ под номером ${question.right_answer}.`,
            })
        }
        catch(e){

        }
    }

    return (
        <section className='flex bg-white w-full p-6 flex-col gap-y-3 text-center rounded-[14px] border shadow-md'>
            <h1 className="font-bold text-xl">У вас есть 15 секунд, чтобы позвонить другу</h1>
            <Separator className="w-full bg-gray-300"/>
            <Form {...form}>
                <form
                    id='enterNameForm'
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id='number_input'
                                            placeholder="Введите номер без пробелов, начинающийся с 7 или 8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Позвонить
                    </Button>
                </form>
            </Form>
        </section>
    )
}
