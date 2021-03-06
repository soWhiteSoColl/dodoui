import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '../button'
import Mask from '../mask'
import { getDOMById } from '../utils/tool'


const dialogRootId = 'do-dialog-root'
const defaulAnimationDuration = 300

interface Props {
  title?: string,
  visible?: boolean,
  onCancel?: any,
  onOk?: any,
  animationIn?: string
  animationDuration?: number
  noCancelBtn?: boolean
}
class Dialog extends React.Component<Props> {
  render() {
    const {
      children,
      title,
      visible,
      onCancel,
      onOk,
      noCancelBtn,
      animationDuration = defaulAnimationDuration
    } = this.props

    return (
      <div
        style={{ animationDuration: animationDuration / 1000 + 's' }}
        className={classnames('do-dialog', visible ? 'do-dialog-animate-in' : 'do-dialog-animate-out')}
      >
        <div className="do-dialog-head">
          <div className="do-dialog-title">{title}</div>
          <div className="do-dialog-cancel-btn" onClick={onCancel}>+</div>
        </div>
        <div className="do-dialog-content">
          {children}
        </div>
        <div className="do-dialog-footer">
          {!noCancelBtn && <Button onClick={onCancel}>取消</Button>}
          <Button type="primary" onClick={onOk}>确定</Button>
        </div>
      </div>
    )
  }
}

const create = option => {
  const props = { ...option }
  props.children = option.content
  
  const close = (option: any = {}) => {
    return new Promise((resolve) => {
      ReactDOM.render(
        <Dialog {...props} visible={false} />,
        getDOMById(dialogRootId)
      )
      !option.notCloseMask && Mask.hidden()
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(getDOMById(dialogRootId))
        resolve()
      }, defaulAnimationDuration + 50)
    })
  }

  const show = () => {
    return new Promise((resolve) => {
      Mask.show()
      ReactDOM.render(
        <Dialog
          {...props}
          visible={true}
          onCancel={() => resolve()}
          onOk={() => resolve(true)}
        />,
        getDOMById(dialogRootId)
      )
    })
  }

  return { show, close }
}

export default {
  create: create
}