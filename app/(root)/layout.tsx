"use client";

import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex min-h-screen items-center justify-center
                        bg-hero bg-cover bg-center bg-zinc-500 bg-blend-multiply'>
        <div className='flex w-full justify-center'>
            {children}
        </div>
    </section>
  )
}

export default RootLayout
