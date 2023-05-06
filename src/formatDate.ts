const formatDate = (date: string): string => {

    const arr: string[] = date.split(" ");
    return ` ${arr[4]}  - ${arr[2]}/${arr[1]}/${arr[3]}`

}

export default formatDate