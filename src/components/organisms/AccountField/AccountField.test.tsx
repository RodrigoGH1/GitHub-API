import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { AccountField } from './AccountField'
import { MockComponent } from '../../../../testMockComponentWrapper/MockComponent'

test('Renders Account Field', () => {
    render(
        <MockComponent>
            <AccountField value="TestAcc" />
        </MockComponent>
    )
})
