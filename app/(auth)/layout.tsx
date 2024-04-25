"use client";

import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex min-h-screen items-center justify-center
                        bg-auth bg-cover bg-center bg-zinc-500 bg-blend-multiply'>
        <div className='flex w-full justify-center'>
            {children}
        </div>
    </section>

  )
}

export default AuthLayout
