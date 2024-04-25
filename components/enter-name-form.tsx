"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage, FormDescription } from "@/components/ui/form"

import { UserSchema } from "@/schemas"
import { CardWrapper } from "./card-wrapper"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { FormError } from "./form-error"
import { useState } from "react"
import { Hint, hintsArray, useUserContext } from "@/context/user";
import { Checkbox } from "./ui/checkbox";

export const EnterNameForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const { setName, setHints } = useUserContext()
    const router = useRouter();

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            hint_fiftyfifty: false,
            hint_crowd: false,
            hint_call: false,
            hint_refresh: false,
            hint_second_chance: false,
        },
    })

    const onSubmit = async (data: z.infer<typeof UserSchema>) => {
        setError("")
        setName('')
        setHints(hintsArray)

        try {
            // Поменять потом на 3 подсказки
            const selected_hints =
                Number(data.hint_fiftyfifty) +
                Number(data.hint_crowd) +
                Number(data.hint_call) +
                Number(data.hint_refresh) +
                Number(data.hint_second_chance)

            const indexes = [
                data.hint_fiftyfifty ? 1 : -1,
                data.hint_crowd ? 2 : -1,
                data.hint_call ? 3 : -1,
                data.hint_refresh ? 4 : -1,
                data.hint_second_chance ? 5 : -1,
            ]

            if (selected_hints !== 3){
                setError("Выберите ровно 3 подсказки для того, чтобы начать игру")
                return;
            }

            setHints(((prevValue: Hint[]) => ([...prevValue].map(
                el => indexes.includes(el.id) ? ({...el, selected: true}): el
            ))) as unknown as Hint[])

            setName(data.name)
            router.push('/question/1')
        }
        catch(e){
            console.log(e)
            setError("Произошла непредвиденная ошибка!")
        }
    }

    return (
        <CardWrapper
            headerLabel="Попробуйте свои силы!"
            backButtonHref="/leaderboard"
            backButtonLabel="Просмотреть статистику пользователей"
        >
            <Form {...form}>
                <form
                    id='enterNameForm'
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id='name_input'
                                            placeholder="Введите ваше имя"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hint_fiftyfifty"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            id="hint_fiftyfifty_checkbox"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            50/50
                                        </FormLabel>
                                        <FormDescription>
                                            Позволяет использовать 50/50 один раз за игру.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hint_crowd"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            id="hint_crowd_checkbox"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Помощь зала
                                        </FormLabel>
                                        <FormDescription>
                                            Позволяет использовать помощь зала один раз за игру.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hint_call"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            id="hint_call_checkbox"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Звонок другу
                                        </FormLabel>
                                        <FormDescription>
                                            Позволяет совершить звонок другу один раз за игру.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hint_refresh"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            id="hint_refresh_checkbox"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Заменить вопрос
                                        </FormLabel>
                                        <FormDescription>
                                            Позволяет заменить вопрос один раз за игру.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hint_second_chance"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            id="hint_second_chance_checkbox"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Право на ошибку
                                        </FormLabel>
                                        <FormDescription>
                                            Позволяет использовать право на ошибку один раз за игру.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Начать игру
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
