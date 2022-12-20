import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ReturnButton } from './ReturnButton'
import { MockComponent } from '../../../../testMockComponentWrapper/MockComponent'

test('ReturnButton renders', () => {
    render(
        <MockComponent>
            <ReturnButton />
        </MockComponent>
    )
})

test('should render an enabled button with the class of primary', () => {
    render(
        <MockComponent>
            <ReturnButton />
        </MockComponent>
    )
    const returnButton = screen.getByTestId('returnButton')
    expect(returnButton).not.toHaveClass('Mui-disabled')
    expect(returnButton).toHaveClass('MuiButton-textPrimary')
})
