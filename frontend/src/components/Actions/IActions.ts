export interface ActionProps {
    onBtnClick: (movie: string) => void
    onSortClick: (sortBy: string, sortMode?: string) => void
    sortDisabled: boolean
}
