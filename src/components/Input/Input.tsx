import classNames from 'classnames'
import {
  ChangeEvent,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styles from './Input.module.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

const Input: FC<IInput> = props => {
  const { className, value: inputValue = '', children, onChange, onFocus, onBlur, ...attrs } = props

  const [value, setValue] = useState(inputValue)
  const [hasFocus, setFocus] = useState<boolean>(false)
  const [hasText, setHasText] = useState<boolean>(!!inputValue)

  const classes = useMemo(
    () => ({
      'has-focus': hasFocus,
      'has-text': hasText,
    }),
    [hasFocus, hasText]
  )

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e)

    setHasText(!!inputValue)
  }

  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e)
    setFocus(true)
  }

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    setFocus(false)
  }

  return (
    <div className={classNames(styles.input, className, classes)}>
      <input
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...attrs}
      />
    </div>
  )
}

export default Input
