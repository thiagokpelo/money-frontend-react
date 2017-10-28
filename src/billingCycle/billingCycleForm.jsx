import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = ( t, v ) => t + v
        return {
            sumOfCredits: this.props.credits.map( c => +c.value || 0 ).reduce( sum ),
            sumOfDebits: this.props.debts.map( d => +d.value || 0 ).reduce( sum )
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebits } = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name'
                        component={labelAndInput}
                        readyOnly={readOnly}
                        type='text'
                        label='Nome'
                        cols='12 4'
                        placeholder='Informe o nome' />
                    <Field name='month'
                        component={labelAndInput}
                        readyOnly={readOnly}
                        type='number'
                        label='Mês'
                        cols='12 4'
                        placeholder='Informe o mês' />
                    <Field name='year'
                        component={labelAndInput}
                        readyOnly={readOnly}
                        type='number'
                        label='Ano'
                        cols='12 4'
                        placeholder='Informe o ano' />
                    <Summary credit={sumOfCredits} debt={sumOfDebits} />
                    <ItemList cols='12 6'
                              list={credits}
                              field='credits'
                              legend='Créditos'
                              readOnly={readOnly} />
                    <ItemList cols='12 6'
                              list={debts}
                              field='debts'
                              legend='Débitos'
                              showStatus={true}
                              readOnly={readOnly} />
                </div>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}


BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })( BillingCycleForm )

const selector = formValueSelector( 'billingCycleForm' )

const mapStateToProps = state => ({
    credits: selector( state, 'credits' ),
    debts: selector( state, 'debts' )
})
const mapDispatchToProps = dispatch => bindActionCreators( { init }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( BillingCycleForm )
