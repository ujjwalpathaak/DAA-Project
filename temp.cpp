#include <bits/stdc++.h>
using namespace std;

class CFIFO
{
public:
    void pageR(int pages[], int pageNo)
    {
        int frames;
        cout << "Enter frames: ";
        cin >> frames;
        int m, n, s;
        int temp[3];
        int pageFaults = 0;
        for (m = 0; m < frames; m++)
        {
            temp[m] = -1;
        }
        for (m = 0; m < pageNo; m++)
        {
            s = 0;
            for (n = 0; n < frames; n++)
            {
                if (pages[m] == temp[n])
                {
                    s++;
                    pageFaults--;
                }
            }
            pageFaults++;
            if ((pageFaults <= frames) && (s == 0))
            {
                temp[m] = pages[m];
            }
            else if (s == 0)
            {
                temp[(pageFaults - 1) % frames] = pages[m];
            }
        }
        cout << "Page Faults: " << pageFaults;
    }
};

class CLRU
{
public:
    int pageR(int page[], int nopages)
    {
        int nofaults, i, count = 0;
        cout << "Enter frames: ";
        cin >> nofaults;
        int frame[3], fcount[3];
        for (i = 0; i < nofaults; i++)
        {
            frame[i] = -1;
            fcount[i] = 0;
        }
        i = 0;
        while (i < nopages)
        {
            int j = 0, flag = 0;
            while (j < nofaults)
            {
                if (page[i] == frame[j])
                {
                    flag = 1;
                    fcount[j] = i + 1;
                }
                j++;
            }
            j = 0;
            if (flag == 0)
            {
                int min = 0, k = 0;
                while (k < nofaults - 1)
                {
                    if (fcount[min] > fcount[k + 1])
                        min = k + 1;
                    k++;
                }
                frame[min] = page[i];
                fcount[min] = i + 1;
                count++;
            }
            i++;
        }
        cout << "Page Faults: " << count;
        return 0;
    }
};

class COPTIMAL
{
public:
    bool search(int key, vector<int> &fr)
    {
        for (int i = 0; i < fr.size(); i++)
            if (fr[i] == key)
                return true;
        return false;
    }

    int predict(int pages[], vector<int> &fr, int pn, int index)
    {
        int res = -1, farthest = index;
        for (int i = 0; i < fr.size(); i++)
        {
            int j;
            for (j = index; j < pn; j++)
            {
                if (fr[i] == pages[j])
                {
                    if (j > farthest)
                    {
                        farthest = j;
                        res = i;
                    }
                    break;
                }
            }
            if (j == pn)
                return i;
        }
        return (res == -1) ? 0 : res;
    }
    void pageR(int pages[], int pn)
    {
        int fn;
        cout << "Enter frames: ";
        cin >> fn;
        vector<int> fr;
        int hit = 0;
        for (int i = 0; i < pn; i++)
        {
            if (search(pages[i], fr))
            {
                hit++;
                continue;
            }
            if (fr.size() < fn)
                fr.push_back(pages[i]);
            else
            {
                int j = predict(pages, fr, pn, i + 1);
                fr[j] = pages[i];
            }
        }
        cout << "Page Faults: " << hit << endl;
    };
};
int main()
{
    int choice;
    cout << "1) FIFO \t 2) LRU \t 3) OPTIMAL \t" << endl
         << "Enter Choice: ";
    cin >> choice;
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int n = sizeof(pages) / sizeof(int);
    switch (choice)
    {
    case 1:
        CFIFO obj;
        obj.pageR(pages, n);
        break;
    case 2:
        CLRU obj1;
        obj1.pageR(pages, n);
        break;
    case 3:
        COPTIMAL obj2;
        obj2.pageR(pages, n);
        break;
    default:
        break;
    }
    return 0;
};