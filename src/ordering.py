import time
import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np

DATA_PATH = '../data/execucao-da-despesa-publica_jan-a-dez_2022.csv'
FILTER_COLUMN = 'Unidade Gestora'
FILTER_VALUE = 'Videira'
FILE_RESULTS = '../results/sorting_results.txt'

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

    df = df.dropna(subset=['Valor Empenhado'])
    # Remover caracteres que não são dígitos, ponto ou vírgula
    df['Valor Empenhado'] = df['Valor Empenhado'].str.replace(
        r'[^\d\.,-]', '', regex=True)
    # Substituir ponto por nada
    df['Valor Empenhado'] = df['Valor Empenhado'].str.replace(
        '.', '', regex=False)
    # Substituir vírgula por ponto
    df['Valor Empenhado'] = df['Valor Empenhado'].str.replace(
        ',', '.', regex=False)
    # Converter para float
    try:
        df['Valor Empenhado'] = df['Valor Empenhado'].astype(float)
    except ValueError as e:
        # Se houver um erro, imprima o valor problemático para diagnóstico
        problem_values = df['Valor Empenhado'].str.extract(r'([^\d\.-])')
        print(f"Valores problemáticos:\n{problem_values.dropna().unique()}")
        raise e

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


def bubble_sort_dataframe(df, column, ascending=True):
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


def selection_sort_dataframe(df, column, ascending=True):
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
    # Se a lista é maior que 1, precisamos dividir e conquistar
    if len(arr) > 1:
        mid = len(arr) // 2
        # Dividindo o array em duas metades
        L = arr[:mid]
        R = arr[mid:]

        # Ordenando as duas metades
        left_indices = merge_sort_indices(L)
        right_indices = merge_sort_indices(R)

        # Fazendo a intercalação das duas metades ordenadas
        return merge(arr, left_indices, right_indices)
    else:
        # Se a lista tem um elemento, retorna uma lista com um índice
        return [0]

# Função para fazer o merge do merge sort


def merge(arr, left_indices, right_indices):
    merged_indices = []
    left_index, right_index = 0, 0

    # Enquanto houver elementos em ambos os lados
    while left_index < len(left_indices) and right_index < len(right_indices):
        if arr[left_index] <= arr[right_index]:
            merged_indices.append(left_indices[left_index])
            left_index += 1
        else:
            merged_indices.append(right_indices[right_index])
            right_index += 1

    # Se sobraram elementos em algum dos lados, estes são adicionados ao final.
    merged_indices.extend(left_indices[left_index:])
    merged_indices.extend(right_indices[right_index:])

    return merged_indices

# Função para fazer o quick sort no dataframe


def quick_sort_dataframe(df, column, ascending=True):
    indices = quick_sort_indices(df[column].tolist(), 0, len(df[column]) - 1)
    if not ascending:
        indices.reverse()
    return df.iloc[indices].reset_index(drop=True)

# Quick sort para listas de índices


def quick_sort_indices(arr, start, end):
    indices = list(range(len(arr)))
    quick_sort(arr, indices, start, end)
    return indices


def quick_sort(arr, indices, start, end):
    if start < end:
        pi = partition(arr, indices, start, end)
        quick_sort(arr, indices, start, pi-1)
        quick_sort(arr, indices, pi+1, end)


def partition(arr, indices, start, end):
    pivot_index = indices[end]
    pivot_value = arr[pivot_index]
    i = start - 1
    for j in range(start, end):
        if arr[indices[j]] < pivot_value:
            i += 1
            indices[i], indices[j] = indices[j], indices[i]
    indices[i+1], indices[end] = indices[end], indices[i+1]
    return i + 1

# Função para salvar os resultados em um arquivo txt


def save_results_to_txt_file(file_results, text, mode='w'):
    with open(file_results, mode, encoding='utf-8') as file:
        file.write(text + '\n')

# Função para plotar o gráfico de barras


def plotar_grafico_de_barras(tempos):
    algoritmos = list(tempos.keys())
    tempos = list(tempos.values())

    # Criar barras
    plt.bar(algoritmos, tempos, color='skyblue')

    # Adicionar título e rótulos
    plt.title('Comparação dos Tempos de Execução dos Algoritmos de Ordenação')
    plt.xlabel('Algoritmos')
    plt.ylabel('Tempo de execução (s)')

    # Adicionar os valores em cima das barras
    for i, tempo in enumerate(tempos):
        plt.text(i, tempo, f"{tempo}", ha='center', va='bottom')

    plt.xticks(rotation=45)  # Rotacionar os rótulos para melhor visualização
    plt.tight_layout()  # Ajustar layout
    # mostrar gráfico em tela cheia
    plt.get_current_fig_manager().window.state('zoomed')
    plt.show()  # Mostrar o gráfico


def test_sorting_function(sorting_function):
    test_data = [3, 1, 4, 1, 5]
    expected_result = [1, 1, 3, 4, 5]
    sorted_data = sorting_function(test_data)
    assert sorted_data == expected_result, "A função de ordenação não está correta."


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

    results_dir = os.path.dirname(FILE_RESULTS)

    if not os.path.exists(results_dir):
        os.makedirs(results_dir)

    save_results_to_txt_file(
        FILE_RESULTS, f"Resultado da ordenação do dataframe filtrado pela coluna '{FILTER_COLUMN}' com o valor '{FILTER_VALUE}'\n")

    # Salvando os resultados em um arquivo txt
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do sort do pandas: {pandas_sort_time}', 'a')
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do bubble sort: {bubble_sort_time}', 'a')
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do selection sort: {selection_sort_time}', 'a')
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do insertion sort: {insertion_sort_time}', 'a')
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do merge sort: {merge_sort_time}', 'a')
    save_results_to_txt_file(
        FILE_RESULTS, f'Tempo de execução do quick sort: {quick_sort_time}', 'a')

    print("Arquivo de resultados salvo com sucesso!")

    tempos_de_execucao = {
        'Pandas Sort': pandas_sort_time,
        'Bubble Sort': bubble_sort_time,
        'Selection Sort': selection_sort_time,
        'Insertion Sort': insertion_sort_time,
        'Merge Sort': merge_sort_time,
        'Quick Sort': quick_sort_time
    }

    # Ordenação de teste com o pandas para comparação
    df_sorted_pandas = df.sort_values(by='Valor Empenhado', ascending=False)

    print(df_sorted_pandas['Valor Empenhado'].head(15))

    # Verificação da ordenação customizada
    df_sorted_custom = merge_sort_dataframe(df, 'Valor Empenhado', False)

    print(df_sorted_custom['Valor Empenhado'].head(15))

    # Supondo que as colunas 'Valor Empenhado' de ambos os DataFrames sejam séries de números de ponto flutuante.
    assert np.isclose(df_sorted_pandas['Valor Empenhado'], df_sorted_custom['Valor Empenhado'],
                      atol=1e-8).all(), "Os resultados da ordenação não são suficientemente próximos."

    # print("Os resultados da ordenação estão corretos.")

    plotar_grafico_de_barras(tempos_de_execucao)
