
import unittest
import pandas as pd
import sys
import os

sys.path.append(os.path.abspath(os.path.join('..', 'src')))

from ordering import (bubble_sort_dataframe, selection_sort_dataframe,
                      insertion_sort_dataframe, merge_sort_dataframe,
                      quick_sort_dataframe)
class TestSortingAlgorithms(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Dados de exemplo para serem usados em todos os testes
        cls.data = {
            'Valor Empenhado': [200, 50, 300, 100, 150]
        }
        cls.df = pd.DataFrame(cls.data)
        cls.sorted_df = cls.df.sort_values(
            by='Valor Empenhado', ascending=False)

    def test_bubble_sort(self):
        sorted_custom = bubble_sort_dataframe(
            self.df, 'Valor Empenhado', False)
        self.assertTrue(self.sorted_df['Valor Empenhado'].equals(
            sorted_custom['Valor Empenhado']))

    def test_selection_sort(self):
        sorted_custom = selection_sort_dataframe(
            self.df, 'Valor Empenhado', False)
        self.assertTrue(self.sorted_df['Valor Empenhado'].equals(
            sorted_custom['Valor Empenhado']))

    def test_insertion_sort(self):
        sorted_custom = insertion_sort_dataframe(
            self.df, 'Valor Empenhado', False)
        self.assertTrue(self.sorted_df['Valor Empenhado'].equals(
            sorted_custom['Valor Empenhado']))

    def test_merge_sort(self):
        sorted_custom = merge_sort_dataframe(self.df, 'Valor Empenhado', False)
        self.assertTrue(self.sorted_df['Valor Empenhado'].equals(
            sorted_custom['Valor Empenhado']))

    def test_quick_sort(self):
        sorted_custom = quick_sort_dataframe(self.df, 'Valor Empenhado', False)
        self.assertTrue(self.sorted_df['Valor Empenhado'].equals(
            sorted_custom['Valor Empenhado']))


if __name__ == '__main__':
    unittest.main()
