import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { MockComponent } from '../../../testMockComponentWrapper/MockComponent'
import { AccountField } from './AccountField'

test('Renders Account Field', () => {
    render(
        <MockComponent>
            <AccountField value="GithubTestAccount" />
        </MockComponent>
    )
})
