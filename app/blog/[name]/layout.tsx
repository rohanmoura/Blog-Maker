import { type ReactNode } from 'react'

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            {children}
        </main>
    )
}

export default layout
