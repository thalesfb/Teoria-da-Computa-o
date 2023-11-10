import time
import pandas as pd

DATA_PATH = 'G:/Meu Drive/Facul/Teoria da Computação/Teoria-da-Computacao/data/execucao-da-despesa-publica_jan-a-dez_2022.csv'
FILTER_COLUMN = 'Unidade Gestora'
FILTER_VALUE = 'Videira'

# Função para ler e filtrar o arquivo CSV


def read_and_filter_csv(path, filter_column, filter_value):
    df = pd.read_csv(path, sep=';')
    if df.empty:
        raise Exception('O dataframe está vazio')
    print("Dataframe carregado com sucesso!")
    print(f'Linhas: {df.shape[0]} | Colunas: {df.shape[1]}')

    # Verificando se a coluna existe no dataframe
    if filter_column not in df.columns:
        raise Exception(f'A coluna {filter_column} não existe no dataframe')
    df = df[df[filter_column].str.contains(filter_value, na=False, case=False)]

    return df

# Função para imprimir os valores únicos de uma coluna


def print_unique_values_of_column(df, column_name):
    unique_values = df[column_name].unique()
    print(f"Valores únicos na coluna '{column_name}':")
    for value in unique_values:
        print(value)

# Função para calcular tempo de execução


def calculate_time(start, end):
    return end - start

# Função para calcular o tempo de excecução de um algoritmo de ordenação


def calculate_sorting_time(df, column, ascending, sort_function):
    start = time.time()
    df = sort_function(df, column, ascending)
    end = time.time()
    return calculate_time(start, end)

# Função para ordenar o dataframe


def sort_dataframe(df, column, ascending):
    return df.sort_values(by=[column], ascending=ascending)

# Função para ordenar o dataframe com o bubble sort


def bubble_sort_dataframe(df, column, ascending):
    # Obter os índices ordenados com base na coluna especificada.
    sorted_indices = bubble_sort_indices(df[column].tolist())
    if not ascending:
        sorted_indices.reverse()

    # Reorganizar o DataFrame de acordo com os índices ordenados.
    sorted_df = df.iloc[sorted_indices]
    return sorted_df.reset_index(drop=True)

# Bubble sort para listas de índices


def bubble_sort_indices(arr):
    n = len(arr)
    indices = list(range(n))
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[indices[j]] > arr[indices[j+1]]:
                indices[j], indices[j+1] = indices[j+1], indices[j]
    return indices

# Função para ordenar o dataframe com o selection sort


def selection_sort_dataframe(df, column, ascending):
    # Obter os índices ordenados com base na coluna especificada.
    sorted_indices = selection_sort_indices(df[column].tolist())
    if not ascending:
        sorted_indices.reverse()

    # Reorganizar o DataFrame de acordo com os índices ordenados.
    sorted_df = df.iloc[sorted_indices]
    return sorted_df.reset_index(drop=True)

# Selection sort para listas de índices


def selection_sort_indices(arr):
    n = len(arr)
    indices = list(range(n))
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[indices[min_idx]] > arr[indices[j]]:
                min_idx = j
        indices[i], indices[min_idx] = indices[min_idx], indices[i]
    return indices

# Função para ordenar o dataframe com o insertion sort


def insertion_sort_dataframe(df, column, ascending=True):
    indices = insertion_sort_indices(df[column].tolist())
    if not ascending:
        indices.reverse()
    return df.iloc[indices].reset_index(drop=True)

# Insertion sort para listas de índices


def insertion_sort_indices(arr):
    indices = list(range(len(arr)))
    for i in range(1, len(arr)):
        key_index = indices[i]
        j = i - 1
        while j >= 0 and arr[indices[j]] > arr[key_index]:
            indices[j + 1] = indices[j]
            j -= 1
        indices[j + 1] = key_index
    return indices

# Função para ordenar o dataframe com o merge sort


def merge_sort_dataframe(df, column, ascending=True):
    indices = merge_sort_indices(df[column].tolist())
    if not ascending:
        indices.reverse()
    return df.iloc[indices].reset_index(drop=True)

# Merge sort para listas de índices


def merge_sort_indices(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        # Sorting the first half
        left_indices = merge_sort_indices(L)
        # Sorting the second half
        right_indices = merge_sort_indices(R)

        return merge(arr, left_indices, right_indices)
    else:
        return list(range(len(arr)))

# Função para fazer o merge do merge sort


def merge(arr, left_indices, right_indices):
    merged_indices = []
    while left_indices and right_indices:
        if arr[left_indices[0]] <= arr[right_indices[0]]:
            merged_indices.append(left_indices.pop(0))
        else:
            merged_indices.append(right_indices.pop(0))
    merged_indices.extend(left_indices or right_indices)
    return merged_indices

# Função para fazer o quick sort no dataframe


def quick_sort_dataframe(df, column, ascending=True):
    indices = quick_sort_indices(df[column].tolist(), 0, len(df[column]) - 1)
    if not ascending:
        indices.reverse()
    return df.iloc[indices].reset_index(drop=True)

# Quick sort para listas de índices


def quick_sort_indices(arr, start, end):
    if start < end:
        pi = partition(arr, start, end)
        quick_sort_indices(arr, start, pi-1)
        quick_sort_indices(arr, pi+1, end)
    return list(range(len(arr)))

# Função para fazer a partição do quick sort


def partition(arr, start, end):
    pivot = arr[end]
    i = start - 1
    for j in range(start, end):
        if arr[j] < pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[end] = arr[end], arr[i+1]
    return i + 1


if __name__ == '__main__':

    # Filtrando o dataframe
    df = read_and_filter_csv(DATA_PATH, FILTER_COLUMN, FILTER_VALUE)

    # Calculando o tempo de execução do sort do pandas
    pandas_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, sort_dataframe)
    # Calculando o tempo de execução do bubble sort
    bubble_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, bubble_sort_dataframe)
    # Calculando o tempo de execução do selection sort
    selection_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, selection_sort_dataframe)
    # Calculando o tempo de execução do insertion sort
    insertion_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, insertion_sort_dataframe)
    # Calculando o tempo de execução do merge sort
    merge_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, merge_sort_dataframe)
    # Calculando o tempo de execução do quick sort
    quick_sort_time = calculate_sorting_time(
        df, 'Valor Empenhado', False, quick_sort_dataframe)

    # Imprimindo valores obtidos de tempo de execução
    print(f'Tempo de execução do sort do pandas: {pandas_sort_time}\n')
    print(f'Tempo de execução do bubble sort: {bubble_sort_time}\n')
    print(f'Tempo de execução do selection sort: {selection_sort_time}\n')
    print(f'Tempo de execução do insertion sort: {insertion_sort_time}\n')
    print(f'Tempo de execução do merge sort: {merge_sort_time}\n')
    print(f'Tempo de execução do quick sort: {quick_sort_time}\n')

    print(df.head(1))
