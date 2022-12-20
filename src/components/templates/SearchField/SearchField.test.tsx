import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SearchField } from './SearchField'

describe('SearchField component', () => {
    test('rendering SearchField', () => {
        render(<SearchField />)
    })
})

describe('button enabled/disabled logic', () => {
    test('button is disabled on empty input', () => {
        render(<SearchField />)
        const inputElement = screen.getByTestId(
            'search-text-field'
        ) as HTMLInputElement
        const submit = screen.getByTestId('search-button')
        expect(inputElement.value).toBe('' || undefined)
        expect(submit).toHaveClass('Mui-disabled')
    })

    test('button is disabled on special characters', () => {
        render(<SearchField />)

        const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
        const excludedLetters = format.toString()
        const wordCatalog = excludedLetters.split('').map((letter) => {
            return 'hello' + letter + 'world'
        })

        const submit = screen.getByTestId('search-button')
        // Loop through each word to create an expectation check
        wordCatalog.forEach((word) => expect(format.test(word)).toBe(true))
        expect(submit).toHaveClass('Mui-disabled')
    })
})
