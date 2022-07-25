import classNames from 'classnames'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Select from 'react-select'
import Input from '../Input/Input'
import styles from './Search.module.scss'

interface IFilter {
  title: string
  icon?: string
}

const filters: IFilter[] = [
  {
    title: 'phones.xls',
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwQjhERjt9Cgkuc3Qxe2ZpbGw6I0ZGOUEzMDt9Cgkuc3Qye2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qze2ZpbGw6IzYxQkVFMjt9Cgkuc3Q0e2ZpbGw6I0ZENDIzMzt9Cgkuc3Q1e2ZpbGw6I0ZGNDAyRjt9Cgkuc3Q2e2ZpbGw6IzFENDA5RDt9Cgkuc3Q3e2ZpbGw6IzAwNzczMjt9Cgkuc3Q4e2ZpbGw6I0ZGNUEyOTt9Cjwvc3R5bGU+PGcvPjxnIGlkPSJQcyIvPjxnIGlkPSJBaSIvPjxnIGlkPSJBaV9kb3dubG9hZCIvPjxnIGlkPSJJbWFnZSIvPjxnIGlkPSJJbWFnZV9kb3dubG9hZCIvPjxnIGlkPSJWaWRlbyIvPjxnIGlkPSJWaWRlb19kb3dubG9hZCIvPjxnIGlkPSJQc19kb3dubG9hZCIvPjxnIGlkPSJEb2MiLz48ZyBpZD0iRG9jX2Rvd25sb2FkIi8+PGcgaWQ9Ik11c2ljIi8+PGcgaWQ9Ik11c2ljX2Rvd25sb2FkIi8+PGcgaWQ9IlBkZiIvPjxnIGlkPSJQZGZfZG93bmxvYWQiLz48ZyBpZD0iV29yZCIvPjxnIGlkPSJXb3JkX2Rvd25sb2FkIi8+PGcgaWQ9IkV4ZWwiPjxnPjxnPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik04MCw5NmgtOC4zbC04LTEzbC04LDEzSDQ4bDExLjQtMTcuN0w0OC43LDYxLjdoOGw3LjQsMTIuM2w3LjItMTIuM2g3LjhsLTEwLjgsMTdMODAsOTZ6Ii8+PC9nPjxnPjxwYXRoIGNsYXNzPSJzdDciIGQ9Ik0xMDQsMTI2SDI0Yy01LjUsMC0xMC00LjUtMTAtMTBWMTJjMC01LjUsNC41LTEwLDEwLTEwaDQwLjdjMi43LDAsNS4yLDEsNy4xLDIuOWwzOS4zLDM5LjMgICAgIGMxLjksMS45LDIuOSw0LjQsMi45LDcuMVYxMTZDMTE0LDEyMS41LDEwOS41LDEyNiwxMDQsMTI2eiBNMjQsNmMtMy4zLDAtNiwyLjctNiw2djEwNGMwLDMuMywyLjcsNiw2LDZoODBjMy4zLDAsNi0yLjcsNi02VjUxLjMgICAgIGMwLTEuNi0wLjYtMy4xLTEuOC00LjJMNjguOSw3LjhDNjcuOCw2LjYsNjYuMyw2LDY0LjcsNkgyNHoiLz48L2c+PC9nPjwvZz48ZyBpZD0iRXhlbF9kb3dubG9hZCIvPjxnIGlkPSJQb3dlcnBvaW50Ii8+PGcgaWQ9IlBvd2VycG9pbnRfZG93bmxvYWQiLz48ZyBpZD0iWmlwIi8+PGcgaWQ9IlppcF9kb3dubG9hZCIvPjwvc3ZnPg==',
  },
  {
    title: 'iphone',
  },
  {
    title: 'samsung',
  },
]

const selectOptions = [
  { value: '1', label: 'Everywhere' },
  { value: '2', label: 'Whole words' },
  { value: '3', label: 'In description' },
]

const isNotEmpty = (val: string) => val.trim() !== ''
const isUniqWord = (val: string, arr: IFilter[]) =>
  arr.some(w => w.title.toLowerCase() === val.toLowerCase())

const Search: FC = () => {
  const [filtersList, setFiltersList] = useState<IFilter[]>(filters)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = isNotEmpty(searchValue) && !isUniqWord(searchValue, filtersList)
    if (!isValid) return

    setFiltersList([
      ...filtersList,
      {
        title: searchValue,
      },
    ])
    setSearchValue('')
  }

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onRemoveFilterClick = (word: IFilter) => () => {
    const updatedList = filtersList.filter(w => w.title !== word.title)
    setFiltersList(updatedList)
  }

  return (
    <div className={styles.search}>
      <div className={styles['input-field']}>
        <Select
          options={selectOptions}
          isSearchable={false}
          className={classNames(styles.select, { 'is-open': selectIsOpen })}
          defaultValue={selectOptions[0]}
          onMenuOpen={() => setSelectIsOpen(true)}
          onMenuClose={() => setSelectIsOpen(false)}
        />

        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Enter your data"
            value={searchValue}
            onChange={onSearchInputChange}
            className={styles.input}
          />
        </form>
      </div>

      <div className={styles.filters}>
        {filtersList.map((word, i) => (
          <div key={i}>
            {word.icon ? <i style={{ backgroundImage: `url(${word.icon})` }} /> : ''}
            {word.title}{' '}
            <button type="button" onClick={onRemoveFilterClick(word)}>
              <svg
                height="16"
                version="1.1"
                viewBox="0 0 512 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
