import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockComponent } from '../../../testMockComponentWrapper/MockComponent'
import { ReturnButton } from './ReturnButton'

test('mock Returnbutton renders', () => {
    render(
        <MockComponent>
            <ReturnButton />
        </MockComponent>
    )
})
