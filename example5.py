from util.lst import group, cross, concat
from util import dct
from util.text import chomp
regions = {'gor':('East', 'WestMidlands', 'EastMidlands', "London",
               "Southeast", "Southwest", "Northeast", "Northwest",
               "Scotland", "Wales", "Yorkshire"),
           'ns': ('London', 'Scotland'),
           'nsrandom':('Ldonon', 'Stolcnad')}
def pairwise(l):
    return [(x,y) for i,x in enumerate(l) for y in l[i+1:]]
def gensh(outname, suffix, division):
    sh = '#!/bin/bash\n'
    suffix = '-' + suffix + '.dat'
    return sh + '\n\n'.join('''echo Starting %(n1)s %(n2)s ...
nice -n 6 ./ctrl.out %(n1)s%(suf)s %(n2)s%(suf)s >>%(out)s'''
                              % dict(n1=name1,n2=name2,suf=suffix,out=outname)
                            for name1,name2 in pairwise(regions[division]))
def norm(s):
    if s.endswith("_tiny\n"):
        return chomp(s)[:-5]
    else:
        return chomp(s)
def clean(outname):
    return [(norm(src),norm(dst),sig)
            for (src,dst,dots,sig) in group(list(open(outname)), 4)]
            #for (src,dst,d_avg,dots,sig) in group(list(open(outname)), 5)]
def significants(edges, iterations):
    return [(src,dst) for (src,dst,sig) in edges
                      if float(sig) / iterations <= 0.05]
def graph(edges, iterations):
    return dct.collapse_pairs(significants(edges, iterations))
def directed(graph):
    return dct.collapse_pairs(concat([[(k,v),(v,k)]
                                      for k in graph for v in graph[k]]))
def process(outname, iterations):
    return graph(clean(outname), iterations)
def count(filepattern, params):
    return dct.count([(src,dst) for param in params
                                for (src,dst) in
                      significants(clean(filepattern % tuple(param)), 1000)])