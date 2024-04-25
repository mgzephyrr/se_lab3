import * as z from "zod";

export const UserSchema = z.object({
    name: z.string().min(1, {
        message: "Пожалуйста, введите ваше имя"
    }).max(50, {
        message: "Имя не может содержать более 50 символов"
    }),
    hint_fiftyfifty: z.boolean(),
    hint_crowd: z.boolean(),
    hint_call: z.boolean(),
    hint_refresh: z.boolean(),
    hint_second_chance: z.boolean(),
})

export const NumberFormSchema = z.object({
    number: z
        .string()
        .regex(new RegExp('^((7|8)+([0-9]){10})$'), 'Такого номера не существует!')
})
